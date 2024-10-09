export type Event = {
  _id: string
  category: string,
  title: string,
  description: string,
  address:string,
  price:number,
  latitude:number,
  longitude:number,
  startDate:string,
  endDate:string,
  workingHours:{
    string:[number]
  },
  imageSrc: string,
  thumbnailSrc: string,
  eventSrc:string
}
