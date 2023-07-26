export { }

declare global {
  interface Window {
    my_modal_2: HTMLDialogElement
  }
}

export type Category = {
  id: number
  name: string
  image: string
}

export type Product = {
  id: number
  name: string
  code: number
  price: number
  image: string
  unitId: number
  categoryId: number
}

export type Unit = {
  id: number
  name: string
}

export type AllDataResponse = {
  categories: category[]
  products: product[]
  units: unit[]
}