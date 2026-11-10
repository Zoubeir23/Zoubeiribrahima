import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { submitResourceSubscription } from "@/lib/resource-subscription/submit-resource-subscription";
import { TRAP_FIELD_NAME } from "@/lib/resource-subscription/subscribe-handler";
import { MAXIMUM_FIRST_NAME_LENGTH, subscriberSchema } from "@/lib/resource-subscription/subscriber-validation";

// First name and email in exchange for the resource library. The browser checks the format at once (typos,
// temporary inboxes); the server checks again and verifies that the domain receives mail before saving.

const fieldClassName =
  "w-full border-b border-[var(--surface-border)] bg-transparent py-3 font-body text-base text-white transition-colors duration-300 placeholder:text-[var(--text-muted)] focus:border-[var(--accent-violet)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)] aria-[invalid=true]:border-[var(--status-error)] sm:text-lg";
const labelClassName = "mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]";

interface ResourceAccessFormProps {
  resourceSlug: string;
  onUnlocked: (firstName: string) => void;
}

const ResourceAccessForm = ({ resourceSlug, onUnlocked }: ResourceAccessFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [trapValue, setTrapValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstNameIdentifier = useId();
  const emailIdentifier = useId();
  const errorIdentifier = useId();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = subscriberSchema.safeParse({ firstName, email, resourceSlug });
    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? null);
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    // The server knows which emails were already sent to Resend: the form simply sends what the visitor typed.
    const result = await submitResourceSubscription({ ...parsed.data, website: trapValue });
    setIsSubmitting(false);
    if (result.success) {
      onUnlocked(parsed.data.firstName);
    } else {
      setErrorMessage(result.error);
    }
  };

  const hasError = errorMessage !== null;

  return (
    <form onSubmit={submit} noValidate className="relative space-y-7">
      <div>
        <label htmlFor={firstNameIdentifier} className={labelClassName}>
          Prénom
        </label>
        <input
          id={firstNameIdentifier}
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={MAXIMUM_FIRST_NAME_LENGTH}
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          aria-describedby={hasError ? errorIdentifier : undefined}
          className={fieldClassName}
        />
      </div>
      <div>
        <label htmlFor={emailIdentifier} className={labelClassName}>
          E-mail
        </label>
        <input
          id={emailIdentifier}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorIdentifier : undefined}
          className={fieldClassName}
        />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input
          type="text"
          name={TRAP_FIELD_NAME}
          tabIndex={-1}
          autoComplete="off"
          value={trapValue}
          onChange={(event) => setTrapValue(event.target.value)}
        />
      </div>
      {hasError && (
        <p id={errorIdentifier} role="alert" className="text-sm text-[var(--status-error)]">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-11 w-full rounded-full bg-white py-4 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Vérification..." : "Débloquer ce guide"}
      </button>
      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
        Chaque guide se débloque séparément : celui-ci n'ouvre pas les autres. Ton accès dure le temps de ta visite
        sur la page : si tu la quittes puis reviens, le formulaire te sera redemandé. Ton e-mail n'est enregistré
        qu'une seule fois. Ton prénom et ton e-mail servent à te tenir au courant des nouvelles ressources ; tu peux
        demander leur suppression à tout moment.
        Détails dans la{" "}
        <Link to="/privacy" className="underline underline-offset-4 hover:text-white">
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
};

export default ResourceAccessForm;
