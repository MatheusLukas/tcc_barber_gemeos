import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const servicesPrimary = [
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
];
const servicesSecondary = [
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
];

export function OurServices() {
  return (
    <div className="container">
      <div className="relative flex justify-center h-[600px]">
        <Image
          className=" w-full max-h-[900px] object-cover relative"
          src="/barber-image.jpg"
          alt="Barber Image"
          width={1920}
          height={1080}
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-85 " />
        <div className="absolute top-10 flex items-center justify-center flex-col *:font-bold text-white">
          <p className="text-4xl">Nossos serviços</p>
        </div>
        <Tabs
          defaultValue="account"
          className="w-[400] absolute top-1/2 left-[400px] flex justify-center flex-col"
        >
          <TabsList className="p-6 flex bg-primary text-muted-text">
            <TabsTrigger className={"w-full bg-primary"} value="account">
              Segunda • Terça • Quarta
            </TabsTrigger>
            <TabsTrigger className="w-full bg-primary" value="password">
              Quinta • Sexta • Sábado
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="flex justify-center items-center"
          >
            <Table className="flex justify-center items-center flex-col">
              {servicesPrimary.map((service) => {
                return (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  <TableBody className="w-full">
                    <TableRow className="bg-[#262626] ">
                      <TableCell className="">{service.type}</TableCell>
                      <TableCell className="">{service.type}</TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TabsContent>
          <TabsContent value="password">
            <Table>
              {servicesSecondary.map((service) => {
                return (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  <TableBody>
                    <TableRow>
                      <TableCell>{service.type}</TableCell>
                      <TableCell className="">{service.type}</TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
