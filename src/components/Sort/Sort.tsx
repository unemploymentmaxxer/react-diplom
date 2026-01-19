import { useEffect, useState, type FC } from "react"
import Select, { type SingleValue } from "react-select"
import { productStore } from "../../store/productStore"

type SortOption = { value: string; label: string }

const options: SortOption[] = [
  { value: "", label: "All products" },
  { value: "title", label: "Alphabet" },
  { value: "price", label: "Price" },
  { value: "stock", label: "Stock" },
]

const Sort: FC = () => {
  const { setSortValue, sortValue } = productStore()
  const [selectedOption, setSelectedOption] = useState<SortOption | null>(null)

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "10px",
      border: "1px solid #c8e6c9",
      boxShadow: "none",
      cursor: "pointer", // <- у тебя было 'pointe'
      minHeight: "44px",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "14px",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "14px",
      padding: "10px 14px",
      cursor: "pointer",
      transition: "background-color 0.15s ease",
    }),
    indicatorContainer: () => ({
      display: "none",
    }),
  }

  const changeSortValue = (option: SingleValue<SortOption>) => {
    const next = option ?? null
    setSelectedOption(next)
    setSortValue(next?.value ?? "")
  }

  useEffect(() => {
    const option = options.find((item) => item.value === sortValue) ?? null
    setSelectedOption(option)
  }, [sortValue])

  return (
    <Select
      value={selectedOption}
      placeholder="Sort by:"
      options={options}
      styles={customStyles}
      onChange={changeSortValue}
    />
  )
}

export default Sort
