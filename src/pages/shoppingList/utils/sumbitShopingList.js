export const submbitShoppingList = (e) => {
  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());

  console.log("values", values, typeof values);

  // All values of which the key starts with "extra" sould go in an array.
  // Create an array of all the values that start with "extra".
  const extraItems = {
    extraItems: Object.keys(values)
      .filter((key) => key.startsWith("extra"))
      .map((key) => values[key]),
  };

  // console.log("extraValues", extraItems);

  // Get the values from the values const, and create an array of strings.
  const items = { items: Object.values(values) };

  // combine items and extraValues into a single object
  // console.log("items", items);

  return Object.assign(items, extraItems);
};
