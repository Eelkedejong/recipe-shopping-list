import { useMutation } from "@tanstack/react-query"

const CreateRecipe = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    // mutation.mutate(new FormData(event.target))
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
      >
        <label htmlFor="name">
          Recipe name
          <input
            id="name"
          />
        </label>
        <label htmlFor="password">
          Description
          <textarea
            id="password"
          />
        </label>
        
        <button>Submit</button>
      </form>
    </>
  )
}

export default CreateRecipe