export {}

declare global {
  interface Window {
    my_modal_2: HTMLDialogElement
  }
}

type dbUserType = { email: string; hashedPw: string; id: number }
