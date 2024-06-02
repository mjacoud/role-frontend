export type Event = {
  _id: string
  category: string,
  title: string,
  description: string,
  address:string,
  coordenates: [number],
  workingHours:{
    string:[number]
  },
  imageSrc: string,
  thumbnailSrc: string,
}
