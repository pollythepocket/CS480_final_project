import { useContext, useEffect, useState } from "react"
import { endpointContext } from "../endpoints"
import "./notification.css"

export default function Notification() {
  const { notice, setNotice, popup, setPopup } = useContext(endpointContext);
  const [ showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    let timerId;

    if (notice != "" ) {
      setShowNotice(true);
      timerId = setTimeout(() => {
        setShowNotice(false);
        setPopup(false)
        setNotice("")
      }, 1000)
    }
    return () => clearTimeout(timerId)
  }, [popup])
  return (
    <div className={`notification ${showNotice ? "" : "hide"}`}>
      <div>{notice}</div>
    </div>
  )
}
