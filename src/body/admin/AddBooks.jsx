import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextInput, Textarea, NumberInput } from "@mantine/core";
import { APIURL, PostRequest, GetRequest } from "../../../services/http";

const AddBooks = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [pages, setPages] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing book when editing
  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);

        const response = await GetRequest(`books/get/${id}`);
        const book = response.data;

        setTitle(book.title || "");
        setAuthor(book.author || "");
        setCategory(book.category || "");
        setPrice(book.price ?? 0);
        setStock(book.stock ?? 0);
        setRating(book.rating ?? 0);
        setPages(book.pages ?? "");
        setPublisher(book.publisher || "");
        setIsbn(book.isbn || "");
        setDescription(book.description || "");
        setCurrentImage(book.image || "");
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Could not load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !category.trim()) {
      alert("Please enter title, author and category");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("rating", rating);
      formData.append("pages", pages);
      formData.append("publisher", publisher);
      formData.append("isbn", isbn);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      let response;

      if (isEditing) {
        response = await fetch(`${APIURL}/books/update/${id}`, {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to update book");
        }
      } else {
        response = await PostRequest("books/add", formData);
      }

      alert(isEditing ? "Book updated successfully!" : "Book added successfully!");

      navigate("/admin/manage");
    } catch (error) {
      console.error("Error saving book:", error);
      alert(error.message || error.response?.data?.message || "Error while saving book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-5/6 bg-gray-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {isEditing
              ? "Update the details of this book."
              : "Add a new book to your store by entering its details below."}
          </p>
        </div>

        {loading && isEditing && !title ? (
          <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            Loading book details...
          </p>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <TextInput
                  label="Book Title"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  size="md"
                  withAsterisk
                  className="md:col-span-2 lg:col-span-3"
                />

                <TextInput
                  label="Author"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  size="md"
                  withAsterisk
                />

                <TextInput
                  label="Category"
                  placeholder="e.g. Fiction, Self-Help"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="md"
                  withAsterisk
                />

                <TextInput
                  label="Publisher"
                  placeholder="Enter publisher name"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  size="md"
                />

                <TextInput
                  label="ISBN"
                  placeholder="Enter unique ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  size="md"
                />
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100" />

            {/* Pricing and Stock */}
            <div className="mb-8">
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <NumberInput
                  label="Price (NPR)"
                  placeholder="Enter price"
                  value={price}
                  onChange={setPrice}
                  min={0}
                  required
                  size="md"
                />

                <NumberInput
                  label="Stock Quantity"
                  placeholder="Enter stock"
                  value={stock}
                  onChange={setStock}
                  min={0}
                  allowDecimal={false}
                  required
                  size="md"
                />

                <NumberInput
                  label="Rating (0–5)"
                  value={rating}
                  onChange={setRating}
                  min={0}
                  max={5}
                  decimalScale={1}
                  size="md"
                />

                <NumberInput
                  label="Number of Pages"
                  placeholder="Enter pages"
                  value={pages === "" ? "" : Number(pages)}
                  onChange={setPages}
                  min={1}
                  allowDecimal={false}
                  size="md"
                />
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100" />

            {/* Description and Image */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-5 text-lg font-semibold text-gray-800">
                  Book Description
                </h2>

                <Textarea
                  placeholder="Write a description of the book..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minRows={6}
                  autosize
                  size="md"
                />
              </div>

              <div>
                <h2 className="mb-5 text-lg font-semibold text-gray-800">
                  Book Cover
                </h2>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0] || null)}
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                />

                {image ? (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="New book cover preview"
                      className="h-56 w-full rounded-lg object-contain"
                    />
                    <p className="mt-2 break-all text-sm text-gray-600">
                      {image.name}
                    </p>
                  </div>
                ) : currentImage ? (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <img
                      src={
                        currentImage.startsWith("http")
                          ? currentImage
                          : `${APIURL}/${currentImage.replace(/\\/g, "/").replace(/^\/+/, "")}`
                      }
                      alt="Current book cover"
                      className="h-56 w-full rounded-lg object-contain"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Current book cover
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
              <Button
                variant="default"
                size="md"
                onClick={() => navigate("/admin/manage")}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                loading={loading}
                size="md"
                color="dark"
              >
                {isEditing ? "Update Book" : "Add Book"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBooks;