import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
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
    <div className="container flex justify-center items-center">
      <div className="relative flex justify-center w-[108rem] h-[700px]">
        <Image
          className="w-full h-full object-cover"
          src="/barber-image.jpg"
          alt="Barber Image"
          width={2300}
          height={1080}
          quality={100}
        />
        <div className="container absolute inset-0 bg-black opacity-85" />

        <div className="absolute top-10 flex items-center justify-center flex-col *:font-bold text-white">
          <p className="text-4xl">Nossos serviços</p>
        </div>

        <Tabs
          defaultValue="account"
          className="w-[50rem] absolute top-40 flex justify-center flex-col"
        >
          <TabsList className="p-6 flex bg-primary text-muted-text gap-4">
            <TabsTrigger className="w-full bg-primary gap-4" value="account">
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
              {servicesPrimary.map((service, index) => {
                return (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  <TableBody className="w-full">
                    <TableRow className="flex justify-center items-center flex-row w-[50rem]">
                      <TableCell
                        // biome-ignore lint/nursery/useConsistentCurlyBraces: <explanation>
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-[#262626] text-primary-inverter"
                        }`}
                      >
                        {service.type}
                      </TableCell>
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-[#262626] text-primary-inverter"
                        }`}
                      >
                        {service.value}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TabsContent>
          <TabsContent value="password">
            <Table>
              {servicesSecondary.map((service, index) => {
                return (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  <TableBody className="w-full ">
                    <TableRow className=" flex justify-center items-center flex-row w-[50rem]">
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-[#262626] text-primary-inverter"
                        }`}
                      >
                        {service.type}
                      </TableCell>
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-[#262626] text-primary-inverter"
                        }`}
                      >
                        {service.value}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TabsContent>
        </Tabs>
        <div className="absolute bottom-6 w-[30.625rem] text-center text-lg">
          <p>
            Aproveite nossos preços e agende seu corte com um dos nossos
            barbeiros
          </p>

          <Button className="w-[27.5rem] h-[3rem] text-lg hover:scale-105 transition-transform">
            Agendar <ArrowUpRight width={35} height={35} />
          </Button>
        </div>
      </div>
    </div>
  );
}
