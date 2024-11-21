import * as motion from "framer-motion/client";
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
    type: "Corte 2 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 3 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 4 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 5 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 6 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 7 pentea",
    value: "R$ 30,00",
  },
];
const servicesSecondary = [
  {
    type: "Corte 1 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 2 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 3 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 4 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 5 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 6 pentea",
    value: "R$ 30,00",
  },
  {
    type: "Corte 7 pentea",
    value: "R$ 30,00",
  },
];

export function OurServices() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="flex justify-center items-center"
    >
      <div className="relative flex justify-center w-[108rem] h-[700px]">
        <Image
          className="w-full h-full object-cover"
          src="/barber-image.jpg"
          alt="Barber Image"
          width={2300}
          height={1080}
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-85" />

        <div className="absolute top-10 flex items-center justify-center flex-col *:font-bold text-white">
          <p className="text-4xl">Nossos serviços</p>
        </div>

        <Tabs
          defaultValue="account"
          className="w-[50rem] absolute top-40 flex justify-center flex-col animate-fade-up delay-500"
        >
          <TabsList className="p-6 flex bg-primary text-muted-text gap-4 rounded-none">
            <TabsTrigger className="w-full bg-primary gap-4" value="account">
              Segunda • Terça • Quarta
            </TabsTrigger>
            <TabsTrigger className="w-full bg-primary" value="password">
              Quinta • Sexta • Sábado
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="flex justify-center items-center mt-2"
          >
            <Table className="flex justify-center items-center flex-col">
              {servicesPrimary.map((service, index) => {
                return (
                  <TableBody key={service.type} className="w-full">
                    <TableRow className="flex justify-center items-center flex-row w-[50rem]">
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-muted-foreground"
                        }`}
                      >
                        {service.type}
                      </TableCell>
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-muted-foreground"
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
          <TabsContent
            value="password"
            className="flex justify-center items-center mt-2  "
          >
            <Table>
              {servicesSecondary.map((service, index) => {
                return (
                  <TableBody key={service.type} className="w-full ">
                    <TableRow className=" flex justify-center items-center flex-row max-w-[50rem]">
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-muted-foreground"
                        }`}
                      >
                        {service.type}
                      </TableCell>
                      <TableCell
                        className={`p-4 w-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-muted-foreground "
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
        <div className="absolute bottom-6 max-w-md text-center text-lg *:text-white">
          <p>
            Aproveite nossos preços e agende seu corte com um dos nossos
            barbeiros
          </p>

          <Button className="h-12 w-full text-lg hover:scale-105 transition-transform">
            Agendar <ArrowUpRight width={35} height={35} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
