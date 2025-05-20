import { Animation } from "@/src/components/animation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Link from "next/link";

export function FilterCharts() {
  const filterOptions = [
    { value: "today", label: "Hoje" },
    { value: "week", label: "Semana" },
    { value: "month", label: "Mês" },
  ];

  return (
    <Animation delay={0.2} once direction="right">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por..." />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} asChild>
              <Link href={{ query: { filter: option.value } }}>
                {option.label}
              </Link>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Animation>
  );
}
