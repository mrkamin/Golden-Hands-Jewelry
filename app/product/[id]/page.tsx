import { products } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Params = {
        id:string;
};

export async function generateMetadata(
    {params}: {params: Params}): Promise<Metadata> {
    const product = products.find((p) => p.id === params.id);
    return {
        title: product?.name || 'Product Not found',
        description: product?.description || '',
    };
}

export default function ProductDetail({params}: {params: Params}) {
    const product = products.find((p) => p.id === params.id);
    
    if (!product) {
        return <div className="p-10 text-center text-red-500">
            Product not found.
        </div>
    }

    const stopwords = new Set ([
        'the', 'and', 'with', 'for', 'from', 'this', 'that', 'your', 'you', 'are', 'was', 'to', 'of', 'in', 'on', 'a', 'an', 'is', 'it', 'by', 'at'   
      ]);

    const extractKeyWrods = (text: string) => 
        text
            .toLowerCase()
            .split(/\W+/)
            .filter((word) => word.length > 2  && !stopwords.has(word));
    

    const productKeyWords = extractKeyWrods(product.name + ' ' + product.description);

    const relatedProducts = products
    .filter((p) => p.id !== params.id)
    .map((p) => {
        const keywords = extractKeyWrods(p.name + ' ' + p.description);
        const matchCount = keywords.filter((word) => productKeyWords.includes(word)).length;
        return {...p, matchCount};
    })
    .filter((p) => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0,6);

    const youMightAlsoLike = products
        .filter((p) => p.id !== params.id && !relatedProducts.find((r) => r.id === p.id))
        .slice(0, 3);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-10">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-auto mb-6 rounded"
                />
                <div>
                    <h1 className="text-3xl font-bold text-yellow-700 mb-2">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                    <p className="text-yellow-800 text-xl font-semibold mb-6">{product.price}</p>
                    <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded">
                        Add to cart
                    </button>
                </div>
            </div>
            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>
                <div className="text-gray-600">⭐️⭐️⭐️⭐️☆ - Beautiful craftsmanship! Would buy again.</div>
                <div className="text-gray-600 mt-2">⭐️⭐️⭐️⭐️⭐️ - Absolutely love it! Fast shipping too.</div>
            </div>
            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Related Products</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {relatedProducts.length === 0 ? (
                        <p className="text-gray-500">No related products found.</p>
                    ) : (
                        relatedProducts.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={400}
                                height={400}
                                className="object-cover w-full h-48 rounded"
                            />
                             <h3 className="mt-2 text-lg font-semibold text-yellow-700">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-yellow-800 font-bold">{item.price}</p>
                            <Link href={`/product/${item.id}`}>
                                <button className="mt-2 text-sm px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                                View Details
                                </button>
                            </Link>
                        </div>
                    ))
                    )}
                </div>
            </div>
            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">You Might Also Like</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {youMightAlsoLike.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={400}
                                height={400}
                                className="object-cover w-full h-48 rounded"
                            />
                            <h3 className="mt-2 text-lg font-semibold text-yellow-700">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-yellow-800 font-bold">{item.price}</p>
                            <Link href={`/product/${item.id}`}>
                                <button className="mt-2 text-sm px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10">
            <Link href="/">
            <button className="text-yellow-700 hover:underline">← Back to Home</button>
            </Link>
            </div>
        </div>
    )
}
