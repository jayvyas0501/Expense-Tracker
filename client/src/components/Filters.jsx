import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";

const Filters = ({
  filterCategory,
  filterStartDate,
  filterEndDate,
  sort,
  setFilterCategory,
  setFilterStartDate,
  setFilterEndDate,
  setSort,
  fetchExpenses
}) => {
  return (
    <div className="mb-6 p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* CATEGORY */}
        <div>
          <Label>Category</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* START DATE */}
        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </div>

        {/* END DATE */}
        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </div>

        {/* SORT */}
        <div>
          <Label>Sort</Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-date">Newest First</SelectItem>
              <SelectItem value="date">Oldest First</SelectItem>
              <SelectItem value="amount">Low → High</SelectItem>
              <SelectItem value="-amount">High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="flex justify-end mt-3">
        <Button onClick={fetchExpenses}>Apply Filters</Button>
      </div>
    </div>
  );
};


export default Filters;
