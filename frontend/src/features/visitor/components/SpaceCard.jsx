import Card from "../../../components/ui/Card";

import Button from "../../../components/ui/Button";

import Badge from "../../../components/ui/Badge";

import { Link } from "react-router-dom";

function SpaceCard({ space }) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">{space.name}</h2>

          <Badge color="blue">{space.type}</Badge>
        </div>

        <p>
          Capacity:
          <strong> {space.capacity}</strong>
        </p>

        <div className="flex flex-wrap gap-2">
          {space.amenities.map((item) => (
            <Badge key={item} color="gray">
              {item}
            </Badge>
          ))}
        </div>

        <Link to={`/spaces/${space._id}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </Card>
  );
}

export default SpaceCard;
