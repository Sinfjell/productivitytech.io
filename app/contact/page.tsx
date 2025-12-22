'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    intent: 'consulting',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourceUrl: window.location.href,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '', intent: 'consulting' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
              Contact Me
            </h1>
            <p className="text-muted-foreground">
              Have a project in mind? Want to customize a product? Let's talk!
            </p>
          </div>

          {status === 'success' && (
            <Alert className="mb-6 border-border/60 bg-card/40">
              <AlertDescription>
                Thank you! I'll get back to you soon.
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Something went wrong. Please try again or email me directly.
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-border/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-border/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intent">What can I help you with?</Label>
                  <Select
                    value={formData.intent}
                    onValueChange={(value) => setFormData({ ...formData, intent: value })}
                  >
                    <SelectTrigger id="intent" className="border-border/60">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulting">Consulting / Custom Development</SelectItem>
                      <SelectItem value="product">Product Inquiry</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-border/60"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full"
                  size="lg"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
