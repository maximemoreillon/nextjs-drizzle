import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  total: number;
  limit: number;
  offset: number;
};
export default function ItemsPagination(props: Props) {
  function getCurrentPageNumber() {
    return props.offset / props.total + 1;
  }

  function getPagesTotal() {
    return Math.ceil(props.total / props.limit);
  }

  function getOffsetForPage(page: number) {
    return page * props.limit;
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem> */}

        {[...Array(getPagesTotal()).keys()].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={`/items?offset=${getOffsetForPage(p)}`}>
              {p + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> 

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>*/}
      </PaginationContent>
    </Pagination>
  );
}
