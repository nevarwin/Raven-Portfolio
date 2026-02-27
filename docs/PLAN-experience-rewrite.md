# Rewrite iOS Developer Experience Description

Rewriting the experience description for the **iOS Developer @ XTREME OFFSHORE OUTSOURCING** role in `index.html` to be more concise, bullet-point based, and recruiter-friendly.

## Proposed Changes

### Frontend — Portfolio HTML

#### [MODIFY] [index.html](file:///c:/Users/raven/Desktop/Raven-Portfolio/index.html)

Replace lines **170–201** (the `<p>` block inside the iOS Developer checkpoint) with the following bullet-point layout:

```html
<p>
    Maintained and developed new features across
    <strong>5 distinct white-label healthcare app targets</strong>
    (including Smart One Health and SaluDi) using <strong>Swift</strong> and
    <strong>Objective-C</strong> with <strong>UIKit</strong>.
</p>
<ul>
    <li>
        Built a real-time video consultation module using
        <strong>WebRTC</strong> for peer-to-peer streaming with native call
        handling integration.
    </li>
    <li>
        Utilized <strong>Grand Central Dispatch (GCD)</strong>
        for concurrent execution of RESTful API calls and third-party service
        integrations.
    </li>
    <li>
        Integrated <strong>Apple HealthKit</strong> to synchronize and surface
        patient health metrics within the telemedicine workflow.
    </li>
    <li>
        Migrated dependency management from
        <strong>CocoaPods</strong> to
        <strong>Swift Package Manager (SPM)</strong>
        for a cleaner, faster build pipeline.
    </li>
</ul>
```

> [!NOTE]
> No other files are affected. This is a single-file copy change inside `index.html`.

## Verification Plan

### Manual Verification

1. Open `index.html` in a browser (or run a local preview server).
2. Scroll to the **Experience** section → iOS Developer checkpoint.
3. Confirm the description renders as a short intro paragraph followed by 4 bullet points.
4. Check both dark mode and light mode for correct styling of the `<ul>` / `<li>` elements.
5. Verify responsiveness on mobile viewport (< 768px).
