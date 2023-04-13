from pydub import AudioSegment
import io

def mp3_to_wav(music_file):
    mp3_music = AudioSegment.from_mp3(io.BytesIO(music_file))
    converted_file = mp3_music.export(f'{music_file}.wav', format='wav')
    return converted_file