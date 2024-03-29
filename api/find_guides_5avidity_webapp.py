"""
Find avidity guide candidates for a list of transcript sequences. 

Last updated:
03/16/2022
"""

from Bio.Seq import Seq
import re


ms2_seq1 = "agacatgaggatcacccatgt"
ms2_seq2 = "aagggtggaggaacaccccaccct"
ms2_seq3 = "acagaagcaccatcagggcttctg"
ms2_seq4 = "gtgcgtggagcatcagcccacgca"
ms2_seq5 = "tcgacgcaggaccaccgcgtc"
ms2_seq6 = "agcgcagaggaacaccctgcg"
ms2_seq7 = "acgggtggaggatcaccccacccg"
ms2_seq8 = "tcgcgaagagcatcagccttcgcg"
# This one is on the plasmid, not used.
ms2_seqN = "ATGACGCAGGACCACCGCGTC".lower()


def guide_has_target_stretch(guide):
    """
    returns true if guide contains any of the following homopolymer target stretches
    """
    guide = str(guide)
    guide = guide.upper()
    st1 = "AAAAA"
    st2 = "TTTTT"
    st3 = "GGGGG"
    st4 = "CCCCC"

    if (st1 in guide) or (st2 in guide) or (st3 in guide) or (st4 in guide):
        return True


def is_stop_codon(nts):
    """
    Returns true if it's a stop codon. False otherwise.
    """
    nts = nts.upper()
    if nts.find("TAA") == -1 and nts.find("TAG") == -1 and nts.find("TGA") == -1:
        return False

    return True


def is_start_codon(nts):
    """
    Returns true if it's a start codon. False otherwise.
    """
    nts = nts.upper()
    if nts.find("ATG") == -1:
        return False

    return True


def guide_has_stop_codon(guide_candidate_rc, CCA_loc_rc):
    # Check if a guide has stop codon given the guide and the CCA loc.
    guide_length = len(guide_candidate_rc)
    # Check for stop codons after the mutation point, but inframe with the TGG.
    for i in range(CCA_loc_rc, guide_length, 3):
        if is_stop_codon(guide_candidate_rc[i : i + 3]):
            return True
    # Check for stop codons before the mutation point, but inframe with the TGG.
    for i in range(CCA_loc_rc, 0, -3):
        if is_stop_codon(guide_candidate_rc[i : i + 3]):
            return True
    return False


def guide_has_start_codon(guide_candidate_rc, CCA_loc_rc):
    # Check if a guide has start codon in frame given the guide and the CCA loc.
    guide_length = len(guide_candidate_rc)
    # Check for start codons after the mutation point, but inframe with the TGG.
    for i in range(CCA_loc_rc, guide_length, 3):
        if is_start_codon(guide_candidate_rc[i : i + 3]):
            return True
    return False


def mutate_away_stop_start_codons(guide_candidate, CCA_loc):
    """
    Mutate away the other stop and start codons given the guide and the CCA loc.
    The third base will be mutated to C. 
    """
    guide_length = len(guide_candidate)
    # Check for stop codons after the mutation point, but inframe with the TGG.
    guide_string = str(guide_candidate)
    for i in range(CCA_loc+3, guide_length, 3):
        if is_stop_codon(guide_candidate[i : i + 3]) or is_start_codon(
            guide_candidate[i : i + 3]
        ):
            guide_string = guide_string[: i + 2] + "c" + guide_string[i + 3 :]
    # Check for stop codons before the mutation point, but inframe with the TGG.
    for i in range(CCA_loc-3, -1, -3):
        if is_stop_codon(guide_candidate[i : i + 3]):
            guide_string = guide_string[: i + 2] + "c" + guide_string[i + 3 :]

    return Seq(guide_string)


def is_BsmBI_site(nts):
    """
    Returns true if it's a BsmBI site.
    """
    nts = nts.upper()
    if nts.find("CGTCTC") == -1 and nts.find("GAGACG") == -1:
        return False
    return True


def mutate_away_BsmBI_sites(guide):
    """
    Mutate away the BsmBI sites. Will mutate away the third letter to a "C".
    """
    guide_string = str(guide)
    for i in range(len(guide)):
        guide_fragment = guide[i : i + 6]
        if is_BsmBI_site(guide_fragment):
            guide_string = guide_string[: i + 2] + "c" + guide_string[i + 3 :]
    return guide_string


def get_guide_candidates_5avidity_webapp(target, name_prefix="guide", length=51):
    """
    Get guide candidates for 5 avidity.
    Args:
        target: Nucleotide sequence of the target transcript to design guides for.
        name_prefix: Name of the transcript.
        length: Length of each segment of the avidity guide. Default to 51bp. 
    Returns:
        A list of tuples that contain (guide_name, designed_guide_sequence, target_sequence).
    """
    print("#### Now working on guide {} ######".format(name_prefix))
    target = str(target)
    target = target.upper()

    CCA_pos_list = [m.start() for m in re.finditer("CCA", target)]

    # Counter for guides.
    guide_counter = 1
    # List of good guides for output.
    good_guides_list = []
    print("CCA positions:", CCA_pos_list)

    for CCA_pos in CCA_pos_list:
        begin_index = int(CCA_pos - ((length - 3) / 2))
        end_index = int(begin_index + length)

        # We check that the full length guide can be generated.
        if begin_index < (2 * length) or (end_index + 2 * length) > len(target):
            continue

        # The mid region is where the "CCA" and editing site is located.
        mid_region = target[begin_index:end_index]

        mid_rev_comp = Seq(mid_region).reverse_complement()
        
        # Make mutation at edit site.
        a_pos = int((length - 1) / 2)
        mid_rev_comp = mid_rev_comp[:a_pos] + "A" + mid_rev_comp[a_pos+1:]

        # Generate the avidity at the other sites.
        right1 = target[end_index + 5 : end_index + 32]
        right2 = target[end_index + 37 : end_index + 64]
        left1 = target[begin_index - 32 : begin_index - 5]
        left2 = target[begin_index - 64 : begin_index - 37]
        right1 = str(Seq(right1).reverse_complement())
        right2 = str(Seq(right2).reverse_complement())
        left1 = str(Seq(left1).reverse_complement())
        left2 = str(Seq(left2).reverse_complement())

        # Full guide.
        generated_guide = (
            right2
            + ms2_seq1
            + right1
            + ms2_seq2
            + mid_rev_comp
            + ms2_seq3
            + left1
            + ms2_seq4
            + left2
        )
        target_region = target[begin_index - 64 : end_index + 64]

        # Location of the CCA in the generated guide.
        # This is the index of the *start* of the CCA.
        CCA_loc = len(right2 + ms2_seq1 + right1 + ms2_seq2) + int((length - 1) / 2) - 1
        mutated_guide = mutate_away_stop_start_codons(generated_guide, CCA_loc)
        # Check and mutate away BsmBI golden gate sites within the guide.
        mutated_guide = mutate_away_BsmBI_sites(mutated_guide)

        # Check for polyNs. We don't want guides with polyNs.
        # if guide_has_target_stretch(mutated_guide):
        #     continue

        guide_name = "{}_CCA_{}_pos_{}_5avidity".format(
            name_prefix, guide_counter, CCA_pos
        )

        good_guides_list.append({"guideName": guide_name, 
            "id" : guide_counter, 
            "pos":  CCA_pos,
            "generatedGuide": str(mutated_guide),
            "guideTarget": str(target_region)
            })
        guide_counter += 1

    return good_guides_list
