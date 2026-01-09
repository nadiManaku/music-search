interface SectionProps<T> {
  title: string;
  items: T[];
  emptyMessage: string;
  renderItem: (item: T) => React.ReactNode;
}
const MAX_ITEMS = 3;

const Section = <T extends { artistId?: number }>({
  title,
  items,
  emptyMessage,
  renderItem,
}: SectionProps<T>) => {
  const visibleItems = items.slice(0, MAX_ITEMS);

  return (
    <section>
      <h2>{title}</h2>
      {visibleItems.length === 0 ? <p>{emptyMessage}</p> : visibleItems.map(renderItem)}
    </section>
  );
};

export default Section;
