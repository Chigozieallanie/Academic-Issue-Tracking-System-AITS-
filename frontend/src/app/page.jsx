import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-white border-b border-primary/20">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-white text-xl">AcadTrack</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-primary hover:bg-white/90">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-white">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
                  Academic Issue Tracking System
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Streamline the process of handling academic issues and complaints with our comprehensive tracking
                  system.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1.5 bg-primary hover:bg-primary/90">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-[5/4] rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z" />
                  </svg>
                </div>
                <span className="text-primary font-medium">Academic Issue Management</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-black text-white">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="text-center md:text-left">
            <p className="text-sm">© 2025 AcadTrack. All rights reserved.</p>
          </div>
          <div className="flex justify-center gap-4 md:justify-end">
            <a href="#" className="text-sm hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-sm hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-sm hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
