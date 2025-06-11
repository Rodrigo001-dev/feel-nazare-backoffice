import { Loader2, XCircle } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

interface ConfirmationDialogProps {
  title: string
  message: string
  cancel: string
  confirm: string
  otherConfirm?: string
  trigger?: React.ReactNode
  handle: () => Promise<void>
  otherHandle?: () => Promise<void>
  isLoading?: boolean
}

export function ConfirmationDialog({
  title,
  message,
  cancel,
  confirm,
  otherConfirm,
  handle,
  otherHandle,
  trigger,
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <div className="flex h-full w-full items-center justify-center">
            <XCircle className="size-5 cursor-pointer text-red-500 hover:text-red-400" />
          </div>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="fixed left-[50%] top-[50%] z-[60] max-h-[85vh] w-[90vw] max-w-[560px] translate-x-[-50%] translate-y-[-50%] rounded bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialogTitle className="text-dark-700 m-0 text-xl font-bold">
          {title}
        </AlertDialogTitle>

        <AlertDialogDescription className="text-dark-700 mb-5 mt-4 text-[15px] leading-normal">
          {message}
        </AlertDialogDescription>

        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <AlertDialogCancel asChild>
            <button className="text-dark-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none transition duration-150 hover:bg-gray-200 focus:shadow-[0_0_0_2px]">
              {cancel}
            </button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <button
              onClick={handle}
              disabled={isLoading}
              className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-500 px-[15px] font-medium leading-none outline-none transition duration-150 hover:bg-red-400 focus:shadow-[0_0_0_2px]"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin text-white" />
              ) : (
                confirm
              )}
            </button>
          </AlertDialogAction>

          {otherConfirm && otherHandle && (
            <AlertDialogAction asChild>
              <button
                onClick={otherHandle}
                disabled={isLoading}
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-600 px-[15px] font-medium leading-none text-red-500 outline-none transition duration-150 hover:bg-red-400 focus:shadow-[0_0_0_2px]"
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin text-white" />
                ) : (
                  otherConfirm
                )}
              </button>
            </AlertDialogAction>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
