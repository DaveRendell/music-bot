import * as React from "react"
import Icon from "./Icon"

type PlayerButtonProps = {
  action: () => void,
  iconClass?: string
  text?: string
}

export default function PlayerButton({
  action, iconClass, text
}: PlayerButtonProps) {
  return (
    <button onClick={() => action()}>
      {iconClass ? <Icon iconClass={iconClass} />: <></>}
      {iconClass && text ? <span> </span> : <></>}
      {text ? <span>{text}</span> : <></>}
    </button>
  )
}
