import * as React from "react"
// https://fontawesome.com/icons

type IconProps = {
  iconClass: string
}

export default function Icon({iconClass}: IconProps) {
  return (
    <i className={"fas fa-lg fa-" + iconClass}></i>
  )
}
