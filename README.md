<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8897ad7c-1421-43a4-8ac3-41e4f39c56ec

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the required keys in `.env.local`
3. Run the app:
   `npm run dev`

## Contact Form via EmailJS

Add these values to `.env.local`:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

The contact page sends these template params to EmailJS:

- `from_name`
- `reply_to`
- `from_email`
- `email`
- `interest`
- `message`

If you still prefer the old backend flow with `/api/contact`, keep the optional Resend variables from [.env.example](.env.example).
