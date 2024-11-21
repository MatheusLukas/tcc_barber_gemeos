import * as motion from "framer-motion/client";
import { Instagram } from "lucide-react";
import Barbeiro from "../public/barbeiro.jpg";
import { OurBarbersCard } from "./our-barbers-cards";

const cardBarbers = [
  {
    photo: Barbeiro,
    barber: "Daniel Freitas",
    role: "Barbeiro",
    icon: Instagram,
  },
  {
    photo: Barbeiro,
    barber: "Gabriel Freitas",
    role: "Barbeiro",
    icon: Instagram,
  },
  {
    photo: Barbeiro,
    barber: "Richard",
    role: "Agiota",
    icon: Instagram,
  },
  {
    photo: Barbeiro,
    barber: "Maionese",
    role: "Manicure",
    icon: Instagram,
  },
];

export function OurBarbers() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="flex justify-start flex-col container mt-32"
    >
      <p className="absolute flex text-3xl font-bold">Nossos barbeiros</p>
      <div className="relative flex top-16 gap-4">
        {cardBarbers.map((barber, index) => {
          return (
            <OurBarbersCard
              key={index}
              barber={barber.barber}
              photo={barber.photo}
              role={barber.role}
              icon={barber.icon}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
