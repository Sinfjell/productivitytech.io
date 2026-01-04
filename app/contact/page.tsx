export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
            Contact
          </h1>
          <p className="text-lg text-muted-foreground">
            Reach out to{' '}
            <a
              href="mailto:sindre@nettsmed.no"
              className="text-primary hover:underline font-medium"
            >
              sindre@nettsmed.no
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
