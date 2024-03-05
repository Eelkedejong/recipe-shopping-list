export const submbitShoppingList = (e) => {
  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());

  // // Get the inputs with the name "recipe_"
  // // Create an object with the name "recipes" with an array of objects.
  // // the objects should have the key "id", which has the value of the number behind "recipe_", which should be a number.
  // // THe objects should also have the key "persons", which has the value of the input, which should be a number.
  // const recipes = {
  //   recipes: Object.keys(values)
  //     .filter((key) => key.startsWith("recipe_"))
  //     .map((key) => {
  //       const id = key.replace("recipe_", "");
  //       return { id: parseInt(id), persons: parseInt(values[key]) };
  //     }),
  // };

  // All values of which the key starts with "extra" sould go in an array.
  // Create an array of all the values that start with "extra".
  const extraItems = {
    extraItems: Object.keys(values)
      .filter((key) => key.startsWith("extra"))
      .map((key) => values[key]),
  };

  // Get the values from the values const, and create an array of strings.
  const items = { items: Object.values(values) };

  // combine items and extraValues into a single object
  return Object.assign(items, extraItems);
};
