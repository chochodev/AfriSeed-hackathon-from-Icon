import { Terminal } from "lucide-react"

import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle,
} from "$/components/ui/alert"

interface AlertProps {
  title: string;
  text: string;
}

function Alert({ title, text }: AlertProps) {
  return (
    <AlertComponent>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {text}
      </AlertDescription>
    </AlertComponent>
  )
}

export default Alert;