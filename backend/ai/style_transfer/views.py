from django.shortcuts import render
# from .apps import WebappConfig
import subprocess

######## rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

######## models & serializers
from .models import *
from .serializers import *

######## s3
import boto3
############################################################################

# s3 access 정보 가져오기 -> 가능하면 암호화(?)하면 좋을듯...
s3 = boto3.client('s3',
                aws_access_key_id='AKIAY2NHL6NEZDLXTAF3',
                aws_secret_access_key='Wht8JFGYjTiKyn9YjjRQEOcoQVVOolUVpAVhfyJ0')
bucket_name = 'bucket-mp3-file-for-mmixx'
# Create your views here.
class MusicAPIView(APIView):
    def post(self, request):
        print("***** Django Music Mix Start *****")
        # # s3 path를 query_params로 주는지 확인해야 함.
        print("request.data : ", request.data)
        music_path = request.data['music_path']
        preset_path = request.data['preset_path']
        print("music_path : ", music_path)
        print("preset_path : ", preset_path)
        # music_path = request.GET.get('music_path')
        # preset_path = request.GET.get('preset_path')
        # music_path = 'music/ba466b9d-3c76-4469-bbe7-6ceb6ef818d9.mp3'
        # preset_path = 'music/5771f0b4-0326-4041-ac57-d86cb8353272.mp3'

        # DeepAFx-ST 실행
        checkpoint_path = './style_transfer/model/music/checkpoints/style/jamendo/autodiff/lightning_logs/version_0/checkpoints/epoch=362-step=1210241-val-jamendo-autodiff.ckpt'
        args = ["python", "./style_transfer/model/music/scripts/process.py", "-i", music_path, "-r", preset_path, "-c", checkpoint_path]
        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            return Response({'FAIL'})

        # results에는 s3에 업로드한 결과 파일의 path를 JSON 형식으로 저장
        results = {
            'music' : 'music/' + f'{music_path[6:-4]}'+'_mix.wav',
        }
        print('results : ', results)
        # 결과물을 serialization해서 springboot 서버로 return
        serializers = MusicSerializer(data = results)
        if serializers.is_valid():
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
class InstAPIView(APIView):
    def post(self, request):
        print("***** Django Music Split Start *****")
        print("request.data : ", request.data)
        music_path = request.data['music_path']
        print("music_path : ", music_path)
        # music_path = request.GET.get('image_path')
        # music_path = 'music/ba466b9d-3c76-4469-bbe7-6ceb6ef818d9.mp3'
        if music_path[-3:] == "mp3":
            format = "mp3"
        elif music_path[-3:] == "wav":
            format = "wav"
        s3.download_file(bucket_name, music_path, f"file/target_inst.{format}")
        
        args = ["python","-m","spleeter", "separate", "-p", "spleeter:2stems", "-o", "output", f"file/target_inst.{format}"]
        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            return Response({'status' : 'failure'})
        inst_path = 'music/' + f'{music_path[6:-4]}'+'_inst.wav'
        data = open("output/target_inst/accompaniment.wav", 'rb')
        s3.put_object(Bucket=bucket_name, Key=inst_path, Body=data, ContentType = 'wav')
        results = {
            'music' : 'music/' + f'{music_path[6:-4]}'+'_inst.wav',
        }
        print('results : ', results)
        serializers = MusicSerializer(data = results)
        if serializers.is_valid():
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.error_messages, status=status.HTTP_400_BAD_REQUEST)