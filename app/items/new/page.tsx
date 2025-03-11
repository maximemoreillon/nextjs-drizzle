import ReturnLink from "@/components/returnLink";
import NewItemForm from "@/components/newItemForm";

export default function newItem() {
  return (
    <div>
      <div>
        <ReturnLink />
      </div>
      <h2 className="text-2xl my-2">New Item</h2>
      <NewItemForm />
    </div>
  );
}
