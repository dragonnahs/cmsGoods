import ButtonLink from './ButtonLink';

export default function SideNav() {
  const routerList = [
    {
      name: 'coustom',
      url: '/dashboard/coustom',
      id: 1,
    },
    {
      name: 'invoice',
      url: '/dashboard/invoice',
      id: 2,
    },
  ];
  return (
    <div className="pt-4 flex flex-col" key="sideNav">
      {routerList.map((item) => {
        return <ButtonLink key={item.id} route={item} />;
      })}
    </div>
  );
}
