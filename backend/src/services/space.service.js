const Space = require("../models/Space");
const ApiError = require("../utils/ApiError");

class SpaceService {
  async create(data) {
    return await Space.create(data);
  }

  async update(id, data) {
    const space = await Space.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );

    if (!space) throw new ApiError(404, "Space not found");

    return space;
  }

  async delete(id) {
    const space = await Space.findByIdAndDelete(id);

    if (!space) throw new ApiError(404, "Space not found");

    return;
  }

  async getOne(id) {
    const space = await Space.findById(id);

    if (!space) throw new ApiError(404, "Space not found");

    return space;
  }

  async getAll(query) {
    const {
      page = 1,

      limit = 10,

      search,

      type,

      capacity,
    } = query;

    const filter = {
      isActive: true,
    };

    if (type) filter.type = type;

    if (capacity)
      filter.capacity = {
        $gte: Number(capacity),
      };

    if (search)
      filter.$text = {
        $search: search,
      };

    const total = await Space.countDocuments(filter);

    const data = await Space.find(filter)

      .skip((page - 1) * limit)

      .limit(Number(limit))

      .sort({
        createdAt: -1,
      });

    return {
      total,

      currentPage: Number(page),

      totalPages: Math.ceil(total / limit),

      data,
    };
  }
}

module.exports = new SpaceService();
