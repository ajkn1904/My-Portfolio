
// SSG fetch function
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/`, {
    cache: "force-cache"
  });

  if (!res.ok) throw new Error("Failed to fetch profile data");

  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
