import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";

const Filters = ({
  filterCategory, filterDate, sort,
  setFilterCategory, setFilterDate, setSort,
  fetchExpenses
}) => {
  return (
    <div className="mb-6 p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CATEGORY FILTER */}
        <div>
          <Label>Category</Label>
          <Select
            onValueChange={setFilterCategory}
            value={filterCategory}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="bills">Bills</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* DATE FILTER */}
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {/* SORT FILTER */}
        <div>
          <Label>Sort</Label>
          <Select onValueChange={setSort} value={sort}>
            <SelectTrigger>
              <SelectValue placeholder="Newest First" />
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
