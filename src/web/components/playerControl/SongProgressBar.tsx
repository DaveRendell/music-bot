import * as React from "react"

type SongProgressBarProps = {
  songName: string,
  isPaused: boolean,
  playTime: number,
  totalTime: number,
}

function minutesAndSeconds(length: number): { minutes: string, seconds: string } {
  return {
    minutes: Math.floor(length / 60).toLocaleString(),
    seconds: (length % 60).toLocaleString("en-GB", { minimumIntegerDigits: 2, useGrouping: false })
  }
}

const INTERVAL = 250

export function SongProgressBar({ songName, isPaused, playTime, totalTime }: SongProgressBarProps) {
  console.log({playTime})
  const [currentTime, setCurrentTime] = React.useState(playTime)

  React.useEffect(() => {
    setCurrentTime(playTime)
  }, [playTime])

  React.useEffect(() => {
    if (isPaused) { return }

    const timer = setTimeout(() => setCurrentTime(currentTime + INTERVAL), INTERVAL)

    return () => clearTimeout(timer)
  }, [isPaused, playTime, currentTime])

  const streamTime = minutesAndSeconds(Math.floor(currentTime / 1000))
  const songTime = minutesAndSeconds(totalTime)

  return <span>{songName} - {streamTime.minutes}:{streamTime.seconds} / {songTime.minutes}:{songTime.seconds}</span>
}