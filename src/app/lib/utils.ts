export function getValueOrDefault(
  input: string | string[] | undefined,
  defaultValue = ""
): string {
  if (Array.isArray(input)) {
    return input.length > 0 ? input[0] : defaultValue;
  }
  return input !== undefined ? input : defaultValue;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export type DateFormatMap = {
  MMMM: string;
  dd: string;
  yyyy: string;
  hh: string;
  mm: string;
  ss: string;
};

export function formatDate(date: Date, format: string): string {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ordinalSuffixes: string[] = ["th", "st", "nd", "rd"];

  const day: number = date.getDate();
  const formatDay: string =
    day +
    (ordinalSuffixes[(day - 20) % 10] ||
      ordinalSuffixes[day] ||
      ordinalSuffixes[0]);

  const map: DateFormatMap = {
    MMMM: monthNames[date.getMonth()],
    dd: formatDay,
    yyyy: date.getFullYear().toString(),
    hh: ("0" + date.getHours()).slice(-2),
    mm: ("0" + date.getMinutes()).slice(-2),
    ss: ("0" + date.getSeconds()).slice(-2),
  };

  return format.replace(
    /MMMM|dd|yyyy|hh|mm|ss/gi,
    (matched) => map[matched as keyof DateFormatMap]
  );
}
