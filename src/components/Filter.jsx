
import { Radio, RangeSlider, Select } from "@mantine/core";
import React, { useState } from "react";

const Filter = ({ books, setFilteredBooks }) => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("All");

  const prices = books.map((item) => item.price);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 10000;

  const [priceRange, setPriceRange] = useState([
    minPrice,
    maxPrice,
  ]);

  const categories = [
    ...new Set(
      books
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  // Apply filters
  const handleFilter = () => {
    const result = books.filter((item) => {

      // Author filter
      const authorMatch =
        !author || item.author === author;

      // Category filter
      const categoryMatch =
        category === "all" || item.category === category;

      // Price filter
      const priceMatch =
        item.price >= priceRange[0] &&
        item.price <= priceRange[1];

      return authorMatch && categoryMatch && priceMatch;
    });

    setFilteredBooks(result);
  };

  return (
    <div className="p-3 sm:p-4 w-full md:w-full bg-secondary text-primary rounded-xl flex flex-col gap-4 h-auto md:sticky md:top-16 md:self-start md:max-h-screen ">

      <h1 className="font-bold text-2xl sm:text-3xl">Filter</h1>

      <div className="pl-2 flex flex-col gap-6 sm:gap-8">
        {/* Author */}
      <div>
        <h2>Author</h2>

        <Select
          searchable
          clearable
          placeholder="Search Author"
          value={author}
          onChange={setAuthor}
          data={[
            ...new Set(
              books
                .map((item) => item.author)
                .filter(Boolean)
            ),
          ].map((author) => ({
            label: author,
            value: author,
          }))}
        />
        <hr className="text-accent mt-1"/>
      </div>
      

      {/* Price */}
      <div>
        <h2>Price Range</h2>

        <div className="mt-4 px-2">
          <RangeSlider
            color="#2F3A1d"
            size="xs"
            min={minPrice}
            max={maxPrice}
            step={20}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>

        <div className="flex justify-between mt-3">
          <span className="text-xs text-gray-500 font-normal">
            NPR. {priceRange[0]}
          </span>

          <span className="text-xs text-gray-500 font-normal">
            NPR. {priceRange[1]}
          </span>
        </div>
        <hr className="text-accent mt-1"/>
      </div>
      
      

      {/* Category */}
      <div>
        <h2 className="mb-2">Category</h2>

        <Radio.Group
          value={category}
          onChange={setCategory}
        >
         <div className="px-2 sm:px-4 flex flex-col gap-2">
            <Radio color="#2F3A1d" value="all" label="All" />
            {categories.map((item) => (
              <Radio
              color="#2F3A1d"
                key={item}
                value={item}
                label={item}
              />
            ))}
          </div>
        </Radio.Group>
        <hr className="text-accent mt-1"/>
      </div>
      

      {/* Filter Button */}
      <div>
        <button
          onClick={handleFilter}
          className="w-full p-2 bg-primary text-secondary rounded-xl shadow-2xl hover:opacity-90 hover:scale-105 transition"
        >
          Filter
        </button>
      </div>
      </div>

    </div>
  );
};

export default Filter;

