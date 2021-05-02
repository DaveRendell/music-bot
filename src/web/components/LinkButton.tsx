import * as React from "react"
import { Redirect } from "react-router-dom"
import PlayerButton from "./PlayerButton"

type LinkButtonProps = {
  to: string
  iconClass?: string
  text?: string
}

export default function LinkButton({
  to, iconClass, text
}: LinkButtonProps) {
  const [pressed, setPressed] = React.useState(false)

  if (pressed) {
    return <Redirect to={to} />
  }
  return <PlayerButton
            action={() => setPressed(true)}
            iconClass={iconClass}
            text={text} />
}
