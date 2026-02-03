import FadeInOnScroll from "./FadeInOnScroll"

export default function IntroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center text-center px-6">
            <FadeInOnScroll>
                <div className="max-w-xl space-y-6">
                    <p className="text-lg opacity-80">
                        Hey Khushboo,
                    </p>

                    <p className="text-lg leading-relaxed">
                        I know you’re not really one for surprises
                        <br />
                        or cringey crap.
                    </p>

                    <p className="text-lg leading-relaxed">
                        But it <em>is</em> Valentine’s week,
                        <br />
                        and today is Proposal Day.
                    </p>

                    <p className="text-lg leading-relaxed">
                        And you know what…
                        <br />
                        the most beautiful girl in the world
                        <br />
                        doesn’t deserve something ordinary or nonchalant.
                    </p>

                    <p className="text-lg leading-relaxed">
                        So, hun…
                        <br />
                        this is me falling on one knee
                        <br />
                        from <strong>800 kilometres away</strong>.
                    </p>

                    <p className="mt-10 text-sm opacity-50">
                        Scroll ↓
                    </p>
                </div>
            </FadeInOnScroll>
        </section>
    )
}
