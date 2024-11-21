import Image from "next/image";

export function OurBarbersCard({
  photo,
  barber,
  role,
  icon: IconComponent,
}: any) {
  return (
    <div className="max-w-72 max-h-80 flex justify-center flex-col gap-2">
      <Image
        className="w-full h-full object-cover"
        src={photo}
        alt={`${barber} photo`}
        width={280}
        height={310}
        quality={100}
      />
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-bold">{barber}</p>
          <p className="font-semibold opacity-50">{role}</p>
        </div>
        <div>
          <IconComponent className="text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
