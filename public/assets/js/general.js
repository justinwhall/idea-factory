jQuery(document).ready(function($){

	//vars
	var ajaxurl			= idea_factory.ajaxurl,
		results         = $('#idea-factory--entry--form-results'),
		thanks_voting   = idea_factory.thanks_voting,
		already_voted   = idea_factory.already_voted,
		nonce   = idea_factory.lb_nonce,
		error_message 	= idea_factory.error_message;


	// entry handler
  	$('#idea-factory--entry--form').submit(function(e) {

  		var $this = $(this);
      
  		e.preventDefault();

	   	if ( $.trim( $('#idea-factory--entryform_title').val() ) === '' || $.trim( $('#idea-factory--entryform_description').val() ) === '' ) {
	        $(results).html('Title and description are required.');
	        $this.find('input').css('border-color','#d9534f');
	        $this.find('textarea').css('border-color','#d9534f');
	        return false;
	    }

		$this.find(':submit').attr( 'disabled','disabled' );
    
    var data = {
      action : 'process_entry_lb',
      'idea-title' : $('#idea-factory--entryform_title').val(),
      'idea-description' : $('#idea-factory--entryform_description').val(),
      'nonce' : nonce
    }
    
    
      $.ajax({
        url     : ajaxurl,
        type    : 'POST',
        data    : data,
        success : function( resp ){
          $(results).html(resp);
          // location.reload();
        }
      });

    });

	$( '.idea-factory' ).live('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		var data      = {
			action:    $this.hasClass('vote-up') ? 'process_vote_up' : 'process_vote_down',
			user_id:   $this.data('user-id'),
			post_id:   $this.data('post-id'),
			nonce:     idea_factory.lb_nonce
		};

		$.post( ajaxurl, data, function(response) {

			if( response == 'success' ) {

				$this.parent().addClass('voted');
				$this.parent().html( thanks_voting );

			} else if( 'already-voted' == response ) {

				alert( already_voted );

			} else {

				alert( error_message );

			}

		});

	});
});
