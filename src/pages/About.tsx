export function About() {
  return (
    <div className="container-abfk py-12 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl mb-8">About Us</h1>

      <div className="prose-content space-y-6 text-brand-black/80 leading-relaxed">
        <p>
          A Boy From Kibera | Thrift & Style is an online thrift fashion brand
          offering affordable, handpicked clothing and footwear. We source
          quality items, share them through our social media platforms, and
          provide convenient delivery while promoting style, value, and
          confidence.
        </p>
        <p>
          Every piece we offer is chosen with care — because looking good and
          feeling confident shouldn't come with a premium price tag. Whether
          you're building a streetwear wardrobe or just hunting for a
          standout piece, we're here to help you wear your story.
        </p>
      </div>

      <div className="mt-10 bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-4 text-sm text-brand-black/60">
        <strong>Note to Peter:</strong> this section uses the description you sent
        over. Feel free to expand it further — how you got started, your
        background, or where you want to take the brand — and we'll update
        this page any time.
      </div>
    </div>
  );
}