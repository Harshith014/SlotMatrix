import Input from "../../../components/ui/Input";

import Select from "../../../components/ui/Select";

function SearchFilters({
  filters,

  setFilters,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Input
        placeholder="Search"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,

            search: e.target.value,
            page: 1,
          })
        }
      />

      <Select
        value={filters.type}
        onChange={(e) =>
          setFilters({
            ...filters,

            type: e.target.value,
            page: 1,
          })
        }
        options={[
          {
            label: "All",

            value: "",
          },

          {
            label: "Desk",

            value: "desk",
          },

          {
            label: "Meeting Room",

            value: "meeting-room",
          },
        ]}
      />

      <Input
        type="number"
        placeholder="Capacity"
        value={filters.capacity}
        onChange={(e) =>
          setFilters({
            ...filters,

            capacity: e.target.value,
            page: 1,
          })
        }
      />
    </div>
  );
}

export default SearchFilters;
