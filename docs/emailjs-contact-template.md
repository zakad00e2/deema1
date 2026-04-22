# EmailJS Contact Template

Use this template in the EmailJS dashboard for `template_x04sjec`.

## Suggested EmailJS fields

Subject:

```text
{{email_subject}}
```

Reply-To:

```text
{{reply_to}}
```

From Name:

```text
{{site_name}} Contact Form
```

## HTML content

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @media only screen and (max-width: 640px) {
        .email-shell {
          padding: 16px !important;
        }

        .email-card {
          border-radius: 18px !important;
        }

        .email-content {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }

        .hero-title {
          font-size: 28px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#fdf9f2;font-family:Manrope,Arial,sans-serif;color:#1c1c18;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="email-shell" style="background-color:#fdf9f2;margin:0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="720" cellspacing="0" cellpadding="0" class="email-card" style="width:720px;max-width:100%;background-color:#ffffff;border:1px solid #e6e2db;border-radius:24px;overflow:hidden;">
            <tr>
              <td class="email-content" style="padding:36px 40px 28px;background-color:#f7f3ec;border-bottom:1px solid #e6e2db;">
                <p style="margin:0 0 12px;font-size:11px;line-height:1.4;letter-spacing:0.24em;text-transform:uppercase;color:#745940;font-weight:700;">
                  Athr Studio Contact Form
                </p>
                <h1 class="hero-title" style="margin:0;font-family:'Noto Serif',Georgia,serif;font-size:34px;line-height:1.2;color:#1c1c18;font-weight:700;">
                  New Contact Request
                </h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#605b55;">
                  A new inquiry has been submitted through <strong>{{site_name}}</strong>. All contact details are listed below for quick follow-up.
                </p>
              </td>
            </tr>

            <tr>
              <td class="email-content" style="padding:32px 40px 10px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 14px;">
                  <tr>
                    <td valign="top">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                              Name
                            </p>
                            <p style="margin:0;font-size:20px;line-height:1.5;color:#1c1c18;font-weight:700;">
                              {{from_name}}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                              Email
                            </p>
                            <p style="margin:0;font-size:16px;line-height:1.7;color:#1c1c18;">
                              <a href="mailto:{{email}}" style="color:#1c1c18;text-decoration:none;">{{email}}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                              Interest
                            </p>
                            <p style="margin:0;font-size:16px;line-height:1.7;color:#1c1c18;">
                              {{interest}}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                              Submitted At
                            </p>
                            <p style="margin:0;font-size:16px;line-height:1.7;color:#1c1c18;">
                              {{submitted_at}}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                              Language
                            </p>
                            <p style="margin:0;font-size:16px;line-height:1.7;color:#1c1c18;">
                              {{locale}}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                              Page
                            </p>
                            <p style="margin:0;font-size:14px;line-height:1.8;color:#1c1c18;word-break:break-word;">
                              <a href="{{page_url}}" style="color:#745940;text-decoration:none;">{{page_url}}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-content" style="padding:8px 40px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f3ec;border:1px solid #e6e2db;border-radius:18px;">
                  <tr>
                    <td style="padding:24px 24px 22px;">
                      <p style="margin:0 0 12px;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:#745940;font-weight:700;">
                        Message
                      </p>
                      <div style="font-size:16px;line-height:1.9;color:#1c1c18;white-space:pre-wrap;">
                        {{message}}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-content" style="padding:0 40px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e6e2db;">
                  <tr>
                    <td style="padding-top:18px;font-size:13px;line-height:1.8;color:#605b55;">
                      Reply directly to this email to contact <strong>{{from_name}}</strong> at
                      <a href="mailto:{{reply_to}}" style="color:#745940;text-decoration:none;">{{reply_to}}</a>.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## Variables now sent from the app

- `from_name`
- `reply_to`
- `from_email`
- `email`
- `interest`
- `message`
- `message_html`
- `locale`
- `submitted_at`
- `submitted_at_iso`
- `page_url`
- `page_path`
- `site_name`
- `email_subject`
