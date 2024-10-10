import Image from "next/image";
import Carousel from "@/components/carousel";
import PhotoTextCard from "@/components/photo-text-card";
import PhotoTextCardLeft from "@/components/photo-text-card-left";

import image1 from '@/assets/placeholder.jpg'
import image2 from '@/assets/placeholder.jpg'
import image3 from '@/assets/placeholder.jpg'
import image4 from '@/assets/placeholder.jpg'
import image5 from '@/assets/placeholder.jpg'

export default function Home() {

  const images = [
    { src: image1, width: 800, height: 600 },
    { src: image2, width: 800, height: 600 },
    { src: image3, width: 800, height: 600 },
    { src: image4, width: 800, height: 600 },
    { src: image5, width: 800, height: 600 },
  ]

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carousel images={images} visibleItems={2}/>
        <PhotoTextCard image={image1} title="Title 1" description="Morbi consectetur elit at orci faucibus vehicula. Vivamus non sagittis eros. Nunc faucibus quam sed dui vestibulum, nec blandit augue hendrerit. Nulla vel maximus mi. Donec et purus ac lacus suscipit eleifend non eget risus. Vivamus consequat, arcu eu pharetra placerat, neque lorem tristique tortor, eget venenatis libero dolor sit amet turpis. Duis tincidunt turpis eget urna molestie feugiat. Phasellus eros sem, consectetur eget dapibus nec, pulvinar in lacus. Aenean efficitur fringilla metus vel placerat. Etiam gravida felis ac magna accumsan tristique."/>
        <PhotoTextCardLeft image={image1} title="Title 2" description="Morbi consectetur elit at orci faucibus vehicula. Vivamus non sagittis eros. Nunc faucibus quam sed dui vestibulum, nec blandit augue hendrerit. Nulla vel maximus mi. Donec et purus ac lacus suscipit eleifend non eget risus. Vivamus consequat, arcu eu pharetra placerat, neque lorem tristique tortor, eget venenatis libero dolor sit amet turpis. Duis tincidunt turpis eget urna molestie feugiat. Phasellus eros sem, consectetur eget dapibus nec, pulvinar in lacus. Aenean efficitur fringilla metus vel placerat. Etiam gravida felis ac magna accumsan tristique."/>
        <PhotoTextCard image={image1} title="Title 3" description="Morbi consectetur elit at orci faucibus vehicula. Vivamus non sagittis eros. Nunc faucibus quam sed dui vestibulum, nec blandit augue hendrerit. Nulla vel maximus mi. Donec et purus ac lacus suscipit eleifend non eget risus. Vivamus consequat, arcu eu pharetra placerat, neque lorem tristique tortor, eget venenatis libero dolor sit amet turpis. Duis tincidunt turpis eget urna molestie feugiat. Phasellus eros sem, consectetur eget dapibus nec, pulvinar in lacus. Aenean efficitur fringilla metus vel placerat. Etiam gravida felis ac magna accumsan tristique."/>
      </main>
    </div>
  );
}
