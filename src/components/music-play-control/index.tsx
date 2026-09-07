import React from "react";

import {
  RiPauseFill,
  RiPlayFill,
  RiReplay5Fill,
  RiForward5Fill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "@remixicon/react";

import IconButton from "@/components/icon-button";
import { usePlayList } from "@/store/play-list";
import { usePlayProgress } from "@/store/play-progress";

/** 快进/回退步长（秒） */
const SEEK_STEP = 5;

const MusicPlayControl = () => {
  const prev = usePlayList(state => state.prev);
  const next = usePlayList(state => state.next);
  const list = usePlayList(state => state.list);
  const togglePlay = usePlayList(state => state.togglePlay);
  const isPlaying = usePlayList(state => state.isPlaying);
  const seek = usePlayList(state => state.seek);

  const isEmptyPlayList = list.length === 0;
  const isSingle = list.length === 1;

  // 基于当前播放进度增减偏移，下限 0、上限总时长
  const seekBy = (delta: number) => {
    if (isEmptyPlayList) return;
    const cur = usePlayProgress.getState().currentTime || 0;
    const dur = usePlayList.getState().duration;
    let nextTime = cur + delta;
    if (nextTime < 0) nextTime = 0;
    if (typeof dur === "number" && Number.isFinite(dur) && nextTime > dur) nextTime = dur;
    seek(nextTime);
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <IconButton radius="full" tooltip="后退 5 秒" onPress={() => seekBy(-SEEK_STEP)} isDisabled={isEmptyPlayList} className="size-8 min-w-8">
        <RiReplay5Fill size={18} />
      </IconButton>
      <IconButton radius="full" onPress={prev} isDisabled={isEmptyPlayList || isSingle} className="size-8 min-w-8">
        <RiSkipBackFill size={18} />
      </IconButton>
      <IconButton
        isDisabled={isEmptyPlayList}
        radius="full"
        onPress={togglePlay}
        variant="solid"
        color="primary"
        className="size-10 min-w-10 text-white"
      >
        {isPlaying ? <RiPauseFill size={20} className="text-white" /> : <RiPlayFill size={20} className="text-white" />}
      </IconButton>
      <IconButton radius="full" onPress={next} isDisabled={isEmptyPlayList || isSingle} className="size-8 min-w-8">
        <RiSkipForwardFill size={18} />
      </IconButton>
      <IconButton radius="md" tooltip="快进 5 秒" onPress={() => seekBy(SEEK_STEP)} isDisabled={isEmptyPlayList}>
        <RiForward5Fill size={20} />
      </IconButton>
    </div>
  );
};

export default MusicPlayControl;
