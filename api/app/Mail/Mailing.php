<?php

namespace App\Mail;

use App\Models\Enums\EmailTemplateEnum;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Mailing extends Mailable
{
    use Queueable, SerializesModels;

    protected EmailTemplateEnum $template;
    protected string $subject;
    protected array $data;

    /**
     * Create a new notification instance.
     */
    public function __construct(EmailTemplateEnum $template, string $subject, array $data)
    {
        $this->template = $template;
        $this->subject = $subject;
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: $this->template->value,
            with: $this->data
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
