import Hotel from "../models/Hotel.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import {
  createHttpError,
  parseBoolean,
  parsePagination
} from "../utils/validator.js";

const buildHotelFilters = (source) => {
  const pagination = parsePagination(source);

  return {
    ...pagination,
    search: source.search,
    city: source.city,
    country: source.country,
    category: source.category,
    featured: parseBoolean(source.featured),
    minRating:
      typeof source.minRating !== "undefined"
        ? Number(source.minRating)
        : undefined,
    minPrice:
      typeof source.minPrice !== "undefined"
        ? Number(source.minPrice)
        : undefined,
    maxPrice:
      typeof source.maxPrice !== "undefined"
        ? Number(source.maxPrice)
        : undefined
  };
};

const getHotels = asyncHandler(async (req, res) => {
  const result = await Hotel.list(buildHotelFilters(req.query));

  return sendResponse(res, {
    message: "Hotels fetched successfully",
    data: result.hotels,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit
    }
  });
});

const getFeaturedHotels = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 6;
  const hotels = await Hotel.getFeatured(limit);

  return sendResponse(res, {
    message: "Featured hotels fetched successfully",
    data: hotels
  });
});

const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    throw createHttpError(404, "Hotel not found");
  }

  return sendResponse(res, {
    message: "Hotel fetched successfully",
    data: hotel
  });
});

const searchHotels = asyncHandler(async (req, res) => {
  const result = await Hotel.list(buildHotelFilters(req.body));

  return sendResponse(res, {
    message: "Hotel search completed successfully",
    data: result.hotels,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit
    }
  });
});

const createHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.create(req.body);

  return sendResponse(res, {
    statusCode: 201,
    message: "Hotel created successfully",
    data: hotel
  });
});

const updateHotel = asyncHandler(async (req, res) => {
  const existingHotel = await Hotel.findById(req.params.id, {
    includeInactive: true
  });

  if (!existingHotel) {
    throw createHttpError(404, "Hotel not found");
  }

  const hotel = await Hotel.update(req.params.id, req.body);

  return sendResponse(res, {
    message: "Hotel updated successfully",
    data: hotel
  });
});

const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.softDelete(req.params.id);

  if (!hotel) {
    throw createHttpError(404, "Hotel not found");
  }

  return sendResponse(res, {
    message: "Hotel deleted successfully",
    data: hotel
  });
});

export {
  getHotels,
  getFeaturedHotels,
  getHotelById,
  searchHotels,
  createHotel,
  updateHotel,
  deleteHotel
};
