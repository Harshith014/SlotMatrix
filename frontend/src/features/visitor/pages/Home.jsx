import { useEffect, useState } from "react";

import { fetchSpaces } from "../../../api/space.api";

import SpaceCard from "../components/SpaceCard";

import SearchFilters from "../components/SearchFilters";

import Loader from "../../../components/ui/Loader";
import Pagination from "../../../components/ui/Pagination";
import EmptyState from "../../../components/ui/EmptyState";

function Home() {
  const [spaces, setSpaces] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,

    limit: 6,

    search: "",

    type: "",

    capacity: "",
  });

  useEffect(() => {
    loadSpaces();
  }, [filters]);

  async function loadSpaces() {
    try {
      if (initialLoading) {
        setLoading(true);
      }

      const res = await fetchSpaces(filters);

      setSpaces(res.data.data.data);

      setPagination({
        total: res.data.data.total,

        currentPage: res.data.data.currentPage,

        totalPages: res.data.data.totalPages,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);

      setInitialLoading(false);
    }
  }

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold mb-8">Workspace Booking</h1>

      <SearchFilters filters={filters} setFilters={setFilters} />

      {spaces.length === 0 ? (
        <EmptyState
          title="No Spaces Found"
          description="Try changing the filters."
        />
      ) : (
        <>
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {spaces.map((space) => (
                <SpaceCard key={space._id} space={space} />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              onPageChange={(page) =>
                setFilters({
                  ...filters,
                  page,
                })
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
