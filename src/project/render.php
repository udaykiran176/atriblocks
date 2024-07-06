<?php
// Get the current logged-in user.
$current_user = wp_get_current_user();
$user_display_name = is_user_logged_in() ? $current_user->display_name : 'Guest';

// Extract attributes
$project_intro = isset($attributes['project_intro']) ? $attributes['project_intro'] : '';
$youtubeUrl = isset($attributes['youtubeUrl']) ? $attributes['youtubeUrl'] : '';
$materials = isset($attributes['materials']) ? $attributes['materials'] : [];
$tools = isset($attributes['tools']) ? $attributes['tools'] : [];
$software = isset($attributes['software']) ? $attributes['software'] : [];
$circuit_diagram = isset($attributes['circuit_diagram']) ? $attributes['circuit_diagram'] : '';
$circuit_diagrams = isset($attributes['circuit_diagrams']) ? $attributes['circuit_diagrams'] : [];
$project_codes = isset($attributes['project_codes']) ? $attributes['project_codes'] : [];
$steps_to_make = isset($attributes['steps_to_make']) ? $attributes['steps_to_make'] : [];

// Function to render table
if (!function_exists('render_table')) {
	function render_table($items, $headers)
	{
		$output = '<div><table><thead><tr>';
		foreach ($headers as $header) {
			$output .= '<th>' . esc_html($header) . '</th>';
		}
		$output .= '</tr></thead><tbody>';
		foreach ($items as $index => $item) {
			$output .= '<tr>';
			$output .= '<td>';
			if (!empty($item['image'])) {
				$output .= '<img src="' . esc_url($item['image']) . '" alt="' . esc_attr($headers[0] . ' ' . ($index + 1)) . '" style="max-width: 100px; height: auto;" />';
			}
			$output .= '</td>';
			$output .= '<td>' . esc_html($item['name']) . '</td>';
			if (isset($item['quantity'])) {
				$output .= '<td>' . esc_html($item['quantity']) . '</td>';
			}
			$output .= '<td>';
			if (!empty($item['buy_link']) || !empty($item['link'])) {
				$output .= '<a href="' . esc_url($item['buy_link'] ?? $item['link']) . '">Link</a>';
			}
			$output .= '</td></tr>';
		}
		$output .= '</tbody></table></div>';
		return $output;
	}
}

// Start output
$block_content = '';

if (!empty($project_intro)) {
	$block_content .= '<div class="detailsbox"><h2>Project Introduction</h2><p>' . wp_kses_post($project_intro) . '</p></div>';
}


if (!empty($youtubeUrl)) {
	$youtubeId = ''; // Variable to hold the extracted YouTube ID

	// Regular expression to extract the YouTube ID
	preg_match('/^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/embed\/)([^#\&\?]*).*/', $youtubeUrl, $matches);

	// Check if the ID is found and has a length of 11 characters
	if (isset($matches[1]) && strlen($matches[1]) === 11) {
		$youtubeId = $matches[1];
	}

	if ($youtubeId) {
		$youtube_embed_url = 'https://www.youtube.com/embed/' . $youtubeId;

		// Adding the iframe to the block content inside the detailsbox div
		$block_content .= '<div class="detailsbox"><h2>YouTube Video</h2>';
		$block_content .= '<div class="youtube-embed">';
		$block_content .= '<iframe class="wp-embed-aspect-16-9 wp-has-aspect-ratio " width="560" height="315" src="' . esc_url($youtube_embed_url) . '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
		$block_content .= '</div>';
		$block_content .= '</div>';
	}
}

// Check if user is logged in
if (is_user_logged_in()) {

	if (!empty($materials)) {
		$block_content .= '<div class="detailsbox"><h2>Materials Required</h2>' . render_table($materials, ['Image', 'Name', 'Quantity', 'Buy Link']) . '</div>';
	}

	if (!empty($tools)) {
		$block_content .= '<div class="detailsbox"><h2>Tools Required</h2>' . render_table($tools, ['Image', 'Name', 'Buy Link']) . '</div>';
	}

	if (!empty($software)) {
		$block_content .= '<div class="detailsbox"><h2>Software Required</h2>' . render_table($software, ['Image', 'Name', 'Link']) . '</div>';
	}

	if ($circuit_diagrams) {
		foreach ($circuit_diagrams as $circuit_diagram) {
			$block_content .= '<div class="detailsbox"><div class="detailsboxflex"><h2>' . esc_html($circuit_diagram['subtitle']) . '</h2><a href="' . esc_url($circuit_diagram['url']) . '" download style="display: inline-block; margin-top: 10px; text-decoration: none; padding: 10px 15px; background-color: #007bff; color: #fff; border-radius: 5px;">Download</a></div><img src="' . esc_url($circuit_diagram['url']) . '" style="max-width: 100%; height: auto; display: block; margin-top: 10px;" /></div>';
		}
	}

	if ($project_codes) {
		foreach ($project_codes as $project_code) {
			$block_content .= '<div class="detailsbox"><div class="detailsboxflex"><h3>' . esc_html($project_code['subtitle']) . '</h3><button class="copy-button" data-code="' . esc_attr($project_code['code']) . '" style="display: inline-block; margin-top: 10px; text-decoration: none; padding: 10px 15px; background-color: #007bff; color: #fff; border-radius: 5px; border: none;">Copy</button></div><pre class="linenumbers" style="height: 500px; overflow: scroll;">' . esc_html($project_code['code']) . '</pre></div>';
		}
	}

	if (!empty($steps_to_make)) {
		$block_content .= '<div class="detailsbox"><h2>Steps to Make</h2>';
		foreach ($steps_to_make as $index => $step) {
			$block_content .= '<div><h3>Step ' . ($index + 1) . '</h3><p>' . wp_kses_post($step) . '</p></div>';
		}
		$block_content .= '</div>';
	}
} else {
	// Display login prompt for non-logged in users
	$block_content .= '<div class="detailsbox">';
	$block_content .= '<h5 style="text-align: center;">Free to Unlock, View Complete project details by Login</h5>';
	$block_content .= '<p style="text-align: center;">By logging in, you can access detailed project information including materials, tools, software, circuit diagrams, project code, and step-by-step instructions.</p>';
	$block_content .= '<ul style="list-style: none;">';
	$block_content .= '<li>✅ Earn Bot Points</li>';
	$block_content .= '<li>✅ Access the Store</li>';
	$block_content .= '<li>✅ Exclusive Courses</li>';
	$block_content .= '<li>✅ Ask Questions and Get Help</li>';
	$block_content .= '</ul>';
	$block_content .= '<a href="#login"><button class="s_btn"><span>Click To Login 😊</span><div class="shine"></div></button></a>';
	$block_content .= '</div>';
}

// Example of printing $block_content
echo $block_content;
