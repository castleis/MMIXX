import { atom } from "recoil";

export const _new_music_list = atom({
  key: "_new_music_list",
  default: [],
});

export const _show_new = atom({
  key: "_show_new",
  default: false,
});

export const _new = atom({
  key: "_new",
  default: false,
});
